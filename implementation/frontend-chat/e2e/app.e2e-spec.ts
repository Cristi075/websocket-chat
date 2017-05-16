import { FrontendChatPage } from './app.po';

describe('frontend-chat App', () => {
  let page: FrontendChatPage;

  beforeEach(() => {
    page = new FrontendChatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
