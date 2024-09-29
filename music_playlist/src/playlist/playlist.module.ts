import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Import MongooseModule
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { Playlist, PlaylistSchema } from './schemas/playlist.schema'; // Import the schema

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Playlist.name, schema: PlaylistSchema },
    ]), 
  ],
  providers: [PlaylistService],
  controllers: [PlaylistController],
})
export class PlaylistModule {}
