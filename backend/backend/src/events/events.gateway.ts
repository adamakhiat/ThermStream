import { WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Interval } from '@nestjs/schedule';
@WebSocketGateway({
  cors:{
    origin:"*"
  }
}
)
export class EventsGateway implements OnGatewayConnection,OnGatewayDisconnect{
  @WebSocketServer()
  server: Server;
  sendToall(){
    return "hello world";
  }
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  // Triggered when a client disconnects
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
   
  @SubscribeMessage('message')
  @Interval(1000)
  handleMessage(client: any, payload: any) {
    this.server.emit('all',this.sendToall())
  }


 
}
