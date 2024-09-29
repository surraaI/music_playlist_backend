import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PlaylistDocument = Playlist & Document;

@Schema({ _id: true }) 
export class Song {
  
  _id: Types.ObjectId; 

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  artist: string;

  @Prop({ required: true })
  url: string;
}

export const SongSchema = SchemaFactory.createForClass(Song);

@Schema()
export class Playlist {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: [SongSchema], default: [] })
  songs: Song[];

  @Prop({ required: true })
  userId: string;
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
