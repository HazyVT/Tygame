export class Time {
  static timeStarted: number = this.getNanoSecTime();


  private static getNanoSecTime() {
    var hrTime = process.hrtime();
    return hrTime[0] * 1000000000 + hrTime[1];
  }

  static getTime() {
    return (this.getNanoSecTime() - this.timeStarted) * 1E-9;
  }
}