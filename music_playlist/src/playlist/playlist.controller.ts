import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { SearchService } from 'src/search/search.service';

@Controller('playlists')
export class PlaylistController {
  constructor(
    private readonly playlistService: PlaylistService,
    private readonly searchService: SearchService,
  ) {}

  @Post()
  async createPlaylist(@Req() req, @Body('title') title: string) {
    const token = req.headers.authorization.split(' ')[1];
    return this.playlistService.create(title, token);
  }

  @Post(':id/add_song')
  async addSongToPlaylist(
    @Param('id') id: string,
    @Body() song: { title: string; artist: string; url: string },
  ) {
    return this.playlistService.addSong(id, song);
  }

  @Post(':id/add_song_from_api')
  async addSongFromAPI(
    @Param('id') id: string,
    @Body('songId') songId: string,
  ) {
    return this.playlistService.addSongFromAPI(id, songId);
  }

  @Get('search_song')
  async searchSong(@Query('query') query: string) {
    return this.searchService.searchSong(query);
  }

  @Get('user/:userId')
  async getUserPlaylists(@Param('userId') userId: string) {
    return this.playlistService.getPlaylistsByUser(userId);
  }

  @Get(':id')
  async getPlaylist(@Param('id') id: string) {
    return this.playlistService.getPlaylistById(id);
  }

  @Delete(':id')
  async deletePlaylist(@Param('id') id: string) {
    return this.playlistService.removePlaylist(id);
  }

  @Delete(':id/remove_song')
  async removeSongFromPlaylist(
    @Param('id') id: string,
    @Body('songId') songId: string,
  ) {
    return this.playlistService.removeSong(id, songId);
  }
}
