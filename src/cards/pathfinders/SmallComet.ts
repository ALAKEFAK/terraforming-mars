import {IProjectCard} from '../IProjectCard';
import {Player} from '../../Player';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Resources} from '../../common/Resources';
import {Tags} from '../Tags';
import {MAX_OCEAN_TILES} from '../../constants';
import {SelectSpace} from '../../inputs/SelectSpace';
import {SpaceType} from '../../SpaceType';
import {ISpace} from '../../boards/ISpace';
import {all} from '../Options';

export class SmallComet extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.EVENT,
      name: CardName.SMALL_COMET,
      cost: 32,
      tags: [Tags.MARS, Tags.SPACE],
      tr: {temperature: 1, oxygen: 1, oceans: 1},

      metadata: {
        cardNumber: 'Pf37',
        renderData: CardRenderer.builder((b) => {
          b.minus().plants(2, {all}).asterix();
          b.br;
          b.temperature(1).oxygen(1).oceans(1).asterix();
          b.br;
          b.titanium(1);
        }),
        description: 'Every player loses 2 plants. Raise the temperature 1 step. Raise the oxygen 1 step. ' +
          'Place an ocean ON AN AREA NOT RESERVED FOR OCEAN. Gain 1 titanium.',
      },
    });
  }

  public play(player: Player) {
    player.game.getPlayers().forEach((p) => {
      if (!p.plantsAreProtected()) {
        p.deductResource(Resources.PLANTS, 2, {log: true, from: player});
      }
    });
    player.game.increaseTemperature(player, 1);
    player.game.increaseOxygenLevel(player, 1);
    player.addResource(Resources.TITANIUM, 1);
    if (player.game.board.getOceansOnBoard() < MAX_OCEAN_TILES) {
      return new SelectSpace('Select a land space to place an ocean', player.game.board.getAvailableSpacesOnLand(player), (space: ISpace) => {
        player.game.addOceanTile(player, space.id, SpaceType.LAND);
        return undefined;
      });
    }
    return undefined;
  }
}

