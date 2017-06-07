import { AngularStartPage } from './app.po';

describe('angular-start App', () => {
  let page: AngularStartPage;

  beforeEach(() => {
    page = new AngularStartPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
