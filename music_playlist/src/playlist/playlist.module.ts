import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Import MongooseModule
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { Playlist, PlaylistSchema } from './schemas/playlist.schema'; // Import the schema
import { SearchService } from 'src/search/search.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Playlist.name, schema: PlaylistSchema },
    ]), 
  ],
  providers: [PlaylistService, SearchService],
  controllers: [PlaylistController],
})
export class PlaylistModule {}
