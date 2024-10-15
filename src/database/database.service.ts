import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { daxQuery } from '../utils/query';
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
  ): Promise<object> {
    const param = {
      TableName: 'submissions_test',
      IndexName: 'projectId-createTime-index',
      KeyConditionExpression:
        'projectId = :projectId and createTime between :timeA and :timeB',
      ExpressionAttributeValues: {
        ':timeA': startDate,
        ':timeB': endDate,
        ':projectId': projectId,
      },
      ProjectionExpression: 'id, projectId, createTime, kycStatus, fullName',
      ScanIndexForward: false,
    };

    const result = await daxQuery(param);
    return result;
  }
}
