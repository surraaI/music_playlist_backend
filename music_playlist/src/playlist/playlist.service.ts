import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Playlist, PlaylistDocument } from './schemas/playlist.schema';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class PlaylistService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>,
  ) {}

  async create(name: string, token: string): Promise<Playlist> {
    const payload = await this.jwtService.decode(token);
    const userId = payload.id;
    const newPlaylist = new this.playlistModel({ name, userId, songs: [] });
    return newPlaylist.save();
  }

  async addSong(
    playlistId: string,
    song: { title: string; artist: string; url: string },
  ): Promise<Playlist> {
    const playlist = await this.playlistModel.findById(playlistId);
    if (!playlist) {
      throw new NotFoundException('Playlist not found');
    }
    playlist.songs.push(song);
    return playlist.save();
  }

  async getPlaylistsByUser(userId: string): Promise<Playlist[]> {
    return this.playlistModel.find({ userId }).exec();
  }

  async getPlaylistById(id: string): Promise<Playlist> {
    return this.playlistModel.findById(id).exec();
  }

  async removePlaylist(id: string): Promise<Playlist> {
    return this.playlistModel.findByIdAndDelete(id).exec();

  }
}
