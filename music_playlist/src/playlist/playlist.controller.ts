import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Req,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';

@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

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
