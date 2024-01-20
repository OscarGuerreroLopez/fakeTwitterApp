import { Injectable } from '@nestjs/common';
import { TweetPost } from '../../core';

@Injectable()
export class AnomalyService {
  alertAnomaly(post: TweetPost) {
    const { properties, hashtag } = post;

    // Calculate the timestamp for 5 minutes ago
    const twoMinutesAgo = new Date();
    twoMinutesAgo.setMinutes(twoMinutesAgo.getMinutes() - 2);
    console.log('@@@ 2 minutes ago', twoMinutesAgo);

    // Filter 'properties' objects within the last 2 minutes
    const propertiesWithinLast5Minutes = properties.filter(
      (property) => property.createdAt >= twoMinutesAgo,
    );

    // Count the filtered properties
    const count = propertiesWithinLast5Minutes.length;

    if (count > 5) {
      console.log('@@@@@@@@@@@@@@@@@@@ALERT ALERT@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

      console.log(
        `Anomaly detected! ${hashtag} has ${count} tweets in the last 2 minutes`,
      );

      console.log(
        '@@@@@@@@@@@@@@@@@@@END ALERT END ALERT@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
      );
    }
  }
}
