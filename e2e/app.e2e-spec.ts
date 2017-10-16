import { MusicPage } from './app.po';

describe('music App', () => {
  let page: MusicPage;

  beforeEach(() => {
    page = new MusicPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
