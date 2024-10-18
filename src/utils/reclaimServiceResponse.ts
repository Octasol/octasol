export class ReclaimServiceResponse {
    flag: string;
    timestamp: string;
    userName: string;
    targetValue: any;
    data: any;
    userId: string;
  
    constructor(flag: string, timestamp: string, userName: string, targetValue: any, data: any, userId: string) {
      this.flag = flag;
      this.timestamp = timestamp;
      this.userName = userName;
      this.targetValue = targetValue;
      this.data = data;
      this.userId = userId;
    }
  }
  