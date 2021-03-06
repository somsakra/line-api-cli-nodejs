import LIFFCommand from '../liff-command';
import ImageHelper from '../../image-helper';
import LIFFAddOperation from '../../operations/liff-add-operation';
import LIFFListOperation from '../../operations/liff-list-operation';
import LIFFRemoveOperation from '../../operations/liff-remove-operation';
import LIFFUpdateOperation from '../../operations/liff-update-operation';

const { spyOn, mock, unmock } = jest;

describe('liff', () => {
  const mockUsage = 'usage';
  let commandLineUsage;

  beforeAll(() => {
    mock('command-line-usage');
    commandLineUsage = require('command-line-usage');
    commandLineUsage.mockImplementation(() => mockUsage);
    spyOn(ImageHelper, 'draw').mockReturnValue(undefined);
    spyOn(console, 'log').mockReturnValue(undefined);
    spyOn(process, 'exit').mockReturnValue(undefined);
  });

  beforeEach(() => {
    commandLineUsage.mockClear();
    ImageHelper.draw.mockClear();
    console.log.mockClear();
    process.exit.mockClear();
  });

  describe('liff add --help', () => {
    beforeAll(() => {
      spyOn(LIFFCommand, 'getCommandLineArgs').mockReturnValue({
        operation: 'add',
        options: {
          help: true
        },
        _unknown: []
      });
    });

    it('display helps', async () => {
      await expect(LIFFCommand.cli());
      expect(ImageHelper.draw).toHaveBeenCalledWith('chick-helps');
      expect(commandLineUsage).toHaveBeenCalledWith(LIFFAddOperation.usage);
      expect(console.log).toHaveBeenCalledWith(mockUsage);
      expect(process.exit).toHaveBeenCalledWith(0);
    });
  });

  describe('liff list --help', () => {
    beforeAll(() => {
      spyOn(LIFFCommand, 'getCommandLineArgs').mockReturnValue({
        operation: 'list',
        options: {
          help: true
        },
        _unknown: []
      });
    });

    it('display helps', async () => {
      await expect(LIFFCommand.cli());
      expect(ImageHelper.draw).toHaveBeenCalledWith('chick-helps');
      expect(commandLineUsage).toHaveBeenCalledWith(LIFFListOperation.usage);
      expect(console.log).toHaveBeenCalledWith(mockUsage);
      expect(process.exit).toHaveBeenCalledWith(0);
    });
  });

  describe('liff remove --help', () => {
    beforeAll(() => {
      spyOn(LIFFCommand, 'getCommandLineArgs').mockReturnValue({
        operation: 'remove',
        options: {
          help: true
        },
        _unknown: []
      });
    });

    it('display helps', async () => {
      await expect(LIFFCommand.cli());
      expect(ImageHelper.draw).toHaveBeenCalledWith('chick-helps');
      expect(commandLineUsage).toHaveBeenCalledWith(LIFFRemoveOperation.usage);
      expect(console.log).toHaveBeenCalledWith(mockUsage);
      expect(process.exit).toHaveBeenCalledWith(0);
    });
  });

  describe('liff update --help', () => {
    beforeAll(() => {
      spyOn(LIFFCommand, 'getCommandLineArgs').mockReturnValue({
        operation: 'update',
        options: {
          help: true
        },
        _unknown: []
      });
    });

    it('display helps', async () => {
      await expect(LIFFCommand.cli());
      expect(ImageHelper.draw).toHaveBeenCalledWith('chick-helps');
      expect(commandLineUsage).toHaveBeenCalledWith(LIFFUpdateOperation.usage);
      expect(console.log).toHaveBeenCalledWith(mockUsage);
      expect(process.exit).toHaveBeenCalledWith(0);
    });
  });

  describe('liff --help', () => {
    beforeAll(() => {
      spyOn(LIFFCommand, 'getCommandLineArgs').mockReturnValue({
        operation: undefined,
        options: {
          help: true
        },
        _unknown: []
      });
    });

    it('display helps', async () => {
      await expect(LIFFCommand.cli());
      expect(ImageHelper.draw).toHaveBeenCalledWith('chick-helps');
      expect(commandLineUsage).toHaveBeenCalledWith([
        ...LIFFAddOperation.usage,
        ...LIFFListOperation.usage,
        ...LIFFRemoveOperation.usage,
        ...LIFFUpdateOperation.usage
      ]);
      expect(console.log).toHaveBeenCalledWith(mockUsage);
      expect(process.exit).toHaveBeenCalledWith(0);
    });
  });

  afterAll(() => {
    commandLineUsage.mockRestore();
    unmock('command-line-usage');
    ImageHelper.draw.mockRestore();
    console.log.mockRestore();
    process.exit.mockRestore();
  });
});
