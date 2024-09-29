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
  async createPlaylist(@Req() token: string, @Body('title') title: string) {
    return this.playlistService.create(title, token);
  }

  @Post(':id/songs')
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
}
