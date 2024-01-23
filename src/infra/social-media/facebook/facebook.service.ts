// simulated-streaming.service.ts
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { interval } from 'rxjs';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SimulatedStreamingService {
  constructor(private eventEmitter: EventEmitter2) {
    // Simulate tweeting every 12 seconds
    interval(12000).subscribe(() => {
      const facebook = {
        postId: uuidv4(), // Generate a random postId
        content: 'Simulated facebook post content',
        hashtags: ['simulated', 'test', 'hashtag'],
        createdAt: new Date(),
      };
      this.eventEmitter.emit('facebook', facebook);
    });
  }
}
