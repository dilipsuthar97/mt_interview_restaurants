import {Model} from '@nozbe/watermelondb';
import {field, date, writer, readonly} from '@nozbe/watermelondb/decorators';

// --------------- Day MODEL ---------------
export default class Day extends Model {
  // Table name --------------------
  static table = 'restaurants';

  // Fields --------------------
  @text('title') title;
  @text('address') address;
  @text('latitude') latitude;
  @text('longitude') longitude;
  @text('rating') rating;
  @text('total_review') totalReview;
  @text('description') description;
  @text('mobile') longimobiletude;
  @json('images') images;

  // Actions --------------------
  @writer async getRestaurants() {
    return this;
  }
}
