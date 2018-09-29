import { A4empappPage } from './app.po';

describe('a4empapp App', () => {
  let page: A4empappPage;

  beforeEach(() => {
    page = new A4empappPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
