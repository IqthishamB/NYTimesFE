export class ResponseModel {
    constructor(
        public Message = '',
        public Status = false,
        public Data: object = new Object(),
    ) {
        Message = Message;
        Status = Status;
        Data = Data;
    }
}