import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import '../styles/Album.css'

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      albumName: '',
      albumMusics: [],
      haveAlbum: false,
    };

    this.showMusic = this.showMusic.bind(this);
    this.renderAlbum = this.renderAlbum.bind(this);
    this.renderMusics = this.renderMusics.bind(this);
  }

  componentDidMount = async () => {
    this.showMusic();
  }

  showMusic = async () => {
    const urlAlbum = window.location.href;
    const initId = 28;
    const albumId = urlAlbum.substring(initId);
    console.log(albumId);
    const albumResult = await getMusics(String(albumId));
    if (albumResult.length !== 0) {
      this.setState({
        artistName: albumResult[0].artistName,
        albumName: albumResult[0].collectionName,
        albumImage: albumResult[0].artworkUrl100,
        albumMusics: albumResult,
        haveAlbum: true,
      });
    }
  }

  renderAlbum() {
    const { artistName, albumName, albumImage } = this.state;
    return (
      <span className="album-infos">
        <img src={ albumImage } alt="" />
        <span className="album-artis-name">
          <h1 data-testid="album-name">{ albumName }</h1>
          <h3 data-testid="artist-name">{ artistName }</h3>
        </span>
      </span>
    );
  }

  renderMusics() {
    const { albumMusics } = this.state;
    const musics = albumMusics.slice(1);
    console.log(musics);
    return (musics.map((music) => (<MusicCard
      objMusic={ music }
      key={ music.trackId }
      trackName={ music.trackName }
      previewUrl={ music.previewUrl }
      trackId={ music.trackId }
    />))
    );
  }

  render() {
    const { haveAlbum } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div className="album">
          { haveAlbum && this.renderAlbum() }
          { haveAlbum && this.renderMusics() }
        </div>
      </div>
    );
  }
}

export default Album;
