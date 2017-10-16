import { Component, OnInit, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { Howl } from 'howler';
import { Response, Headers, Http } from '@angular/http';
// import { HttpClient } from '@angular/common/http';
// import the do function to be used with the http library.
import 'rxjs/add/operator/do';
// import the map function to be used with the http library
import 'rxjs/add/operator/map';


// import {p5} from 'p5';
@Component({
  selector: 'app-musiclist',
  templateUrl: './musiclist.component.html',
  styleUrls: ['./musiclist.component.css']
})
export class MusiclistComponent implements OnInit, OnChanges {

  files: any[];
  musicList: string[];

  private path = 'assets/uploads/';


  sound;

  constructor(private http: Http, private el: ElementRef) {

  }

  ngOnInit() {
    this.getMusic();
  }

  ngOnChanges() {
    this.getMusic();
    console.log(this.musicList);
  }

  // this is to play the music
  musicplay() {
    for (let i = 0; i < this.musicList.length; i++) {
      this.sound = new Howl({
        src: [this.path + this.musicList[i]],
        format: ['flac', 'mp3'],
        buffer: true,
        autoplay: true
      });
      this.sound.play();
    }

  }

  // This is to pause the music
  musicPause() {
    this.sound.pause();
  }


  // To add music to backend folder
  addFile() {
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#files');
    console.log(inputEl);
    const fileCount: number = inputEl.files.length;
    const formData = new FormData();
    if (fileCount > 0) {
      formData.append('files', inputEl.files.item(0));
      this.http.post('/posts', formData).map((res: Response) => res.json()).subscribe(

        (success) => {
          alert(success._body);
        },
        (error) => alert(error)
      );
    }
    this.getMusic();
  }

  // to retrieve the music file
  getMusic() {
    return this.http.get('/music').subscribe(
      (res) => this.musicList = res.json(),
      (res) => console.log(res));

  }

  // This is to remove the file stored in the uploads folder
  removeFile(list) {
    console.log(list);
    const data = list;
    this.http.post('/remove', data).map((res: Response) => res.json()).subscribe(

      (success) => {
        alert(success._body);
      },
      (error) => alert(error)
    );

    this.getMusic();

  }


}
