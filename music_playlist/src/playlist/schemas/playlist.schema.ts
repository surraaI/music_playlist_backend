import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlaylistDocument = Playlist & Document;

@Schema()
export class Song {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  artist: string;

  @Prop({ required: true })
  url: string; 
}


@Schema()
export class Playlist {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: [Object], default: [] })
  songs: object[];

  @Prop({ required: true }) // userId is required
  userId: string;
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
