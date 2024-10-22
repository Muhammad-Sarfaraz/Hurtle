import status from 'http-status';

class PingService {
  public getPingMessage() {
    return { message: 'Server is up and running!', statusCode: status.OK };
  }
}

export default new PingService();
