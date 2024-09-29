import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Playlist, PlaylistDocument } from './schemas/playlist.schema';
import { JwtService } from '@nestjs/jwt';
import { SearchService } from 'src/search/search.service';

@Injectable()
export class PlaylistService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly searchService: SearchService,
    @InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>,
  ) {}

  async create(title: string, token: string): Promise<Playlist> {
    const payload = await this.jwtService.decode(token);
    const userId = payload.id;
    const newPlaylist = new this.playlistModel({ title, userId, songs: [] });
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
    const newSong = { ...song, _id: new Types.ObjectId() };
    playlist.songs.push(newSong);
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

  async removeSong(playlistId: string, songId: string): Promise<Playlist> {
    const playlist = await this.playlistModel.findById(playlistId);
    if (!playlist) {
      throw new NotFoundException('Playlist not found');
    }
    playlist.songs = playlist.songs.filter(
      (song) => song._id.toString() != songId,
    );

    return playlist.save();
  }
  async addSongFromAPI(playlistId: string, songId: string): Promise<Playlist> {
    const playlist = await this.playlistModel.findById(playlistId);
    if (!playlist) {
      throw new NotFoundException('Playlist not found');
    }
    const songDetails = await this.searchService.searchSongById(songId);
    playlist.songs.push({
      _id: new Types.ObjectId(),
      title: songDetails.title,
      artist: songDetails.artist.name,
      url: songDetails.link,
    });

    return playlist.save();
  }
}
