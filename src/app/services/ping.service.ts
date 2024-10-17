class PingService {
    public getPingMessage(): string {
        return 'Server is up and running!';
    }
}

export default new PingService();
