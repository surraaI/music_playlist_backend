import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SearchService {
  private readonly deezerApiUrl = 'https://api.deezer.com/search';

  async searchSong(query: string): Promise<any> {
    try {
      const response = await axios.get(`${this.deezerApiUrl}?q=${query}`);
      return response.data.data; // Returns the song data from Deezer API
    } catch (error) {
      throw new Error('Error fetching songs from Deezer API');
    }
  }

  async searchSongById(songId: string): Promise<any> {
    try {
      const response = await axios.get(
        `https://api.deezer.com/track/${songId}`,
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching song details from Deezer API');
    }
  }
}
