import { DynamoDB } from 'aws-sdk';
import { performance } from 'perf_hooks';
import AmazonDaxClient from 'amazon-dax-client';
const docClient = new DynamoDB.DocumentClient({ region: 'us-east-1' });

/** DAX 설정 */
// const daxClient = new AmazonDaxClient({
//   endpoints: [
//     'dax://ekyc-cache-dax.tepg4m.dax-clusters.us-east-1.amazonaws.com',
//   ],
//   region: 'us-east-1',
// });
// const dax = new DynamoDB.DocumentClient({
//   region: 'us-east-1',
//   service: daxClient,
//   maxRetries: 3,
//   httpOptions: { timeout: 5000 },
// });

export const daxQuery = async (
  params: DynamoDB.DocumentClient.QueryInput,
): Promise<DynamoDB.DocumentClient.ItemList> => {
  let items = [];
  let lastEvaluatedKey = null;
  const startTime = performance.now();
  let totalQueryTime = 0;
  let queryCount = 0;

  const queryWithRetry = async (params, maxRetries = 5, delay = 100) => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const queryStartTime = performance.now();
        const result = await docClient.query(params).promise();
        // const result = await dax.query(params).promise();
        const queryEndTime = performance.now();
        totalQueryTime += queryEndTime - queryStartTime;
        queryCount++;
        return result;
      } catch (error) {
        if (error.code === 'ThrottlingException' && i < maxRetries - 1) {
          await new Promise((resolve) =>
            setTimeout(resolve, delay * Math.pow(2, i)),
          );
        } else {
          throw error;
        }
      }
    }
  };

  try {
    do {
      if (lastEvaluatedKey) {
        params.ExclusiveStartKey = lastEvaluatedKey;
      }

      const result = await queryWithRetry(params);

      if (result.Items) items = items.concat(result.Items);
      lastEvaluatedKey = result.LastEvaluatedKey;

      if (queryCount % 100 === 0)
        console.log(
          `Query ${queryCount}: Retrieved ${result.Items.length} items. Total items: ${items.length}`,
        );

      // 옵션: 일정 크기에 도달하면 처리를 중단 (메모리 관리를 위해)
      if (items.length >= 1000000) {
        // 예: 100만 개 항목 제한
        console.warn('Reached item limit. Stopping query execution.');
        break;
      }
    } while (lastEvaluatedKey);

    const endTime = performance.now();
    console.log(`Total execution time: ${(endTime - startTime).toFixed(2)}ms`);
    console.log(`Total query time: ${totalQueryTime.toFixed(2)}ms`);
    console.log(`Number of queries executed: ${queryCount}`);
    console.log(`Total items retrieved: ${items.length}`);

    return items;
  } catch (error) {
    console.error('Error in executeQuery:', error);
    throw error;
  }
};
