export class ReclaimServiceResponse {
    flag: string;
    timestamp: string;
    userName: string;
    targetValue: any;
    data: any;
  
    constructor(flag: string, timestamp: string, userName: string, targetValue: any, data: any) {
      this.flag = flag;
      this.timestamp = timestamp;
      this.userName = userName;
      this.targetValue = targetValue;
      this.data = data;
    }
}
  