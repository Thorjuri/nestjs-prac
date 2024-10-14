import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
const docClient = new DynamoDB.DocumentClient({ region: 'us-east-1' });

@Injectable()
export class DatabaseService {
  async getSingleBySubmissionId(id): Promise<any> {
    const param = {
      TableName: 'submissions_test',
      Key: { id },
    };
    const result = await docClient.get(param).promise();
    return result?.Item ? result.Item : {};
  }

  async queryListByProjectId(
    projectId: string,
    startDate: string,
    endDate: string,
  ): Promise<any> {
    const param = {
      TableName: 'submissions_test',
      IndexName: 'projectId-createTime-index',
      KeyConditionExpression: 'projectId = :projectId and createTime between :timeA and :timeB',
      ExpressionAttributeValues: {
        ':timeA': startDate,
        ':timeB': endDate,
        ':projectId': projectId,
      },
      ScanIndexForward: false
    };

    const result = await docClient.query(param).promise();
  }
}
