import RichmenuCommand from '../richmenu-command';
import ImageHelper from '../../image-helper';

const { spyOn } = jest;

describe('richmenu --version', () => {
  beforeAll(() => {
    spyOn(ImageHelper, 'draw').mockReturnValue(undefined);
    spyOn(console, 'log').mockReturnValue(undefined);
    spyOn(process, 'exit').mockReturnValue(undefined);
  });

  describe('when able to display version', () => {
    beforeAll(() => {
      spyOn(RichmenuCommand, 'getCommandLineArgs').mockReturnValue({
        operation: null,
        options: {
          version: true
        }
      });
    });

    it('display version', async () => {
      await expect(RichmenuCommand.cli());
      expect(ImageHelper.draw).toHaveBeenCalledWith('chick-helps');
      expect(console.log).toHaveBeenCalledWith(RichmenuCommand.versionText);
      expect(process.exit).toHaveBeenCalledWith(0);
    });

    afterAll(() => {
      RichmenuCommand.getCommandLineArgs.mockRestore();
    });
  });

  afterAll(() => {
    ImageHelper.draw.mockRestore();
    console.log.mockRestore();
    process.exit.mockRestore();
  });
});
