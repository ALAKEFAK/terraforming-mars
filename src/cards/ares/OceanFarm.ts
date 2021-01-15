import {Card} from '../Card';
import {CardName} from '../../CardName';
import {Game} from '../../Game';
import {SelectSpace} from '../../inputs/SelectSpace';
import {ISpace} from '../../boards/ISpace';
import {Player} from '../../Player';
import {Resources} from '../../Resources';
import {SpaceBonus} from '../../SpaceBonus';
import {TileType} from '../../TileType';
import {CardType} from './../CardType';
import {IProjectCard} from './../IProjectCard';
import {Tags} from './../Tags';
import {CardRequirements} from '../CardRequirements';
import {CardRenderer} from '../render/CardRenderer';
import {GlobalParameter} from '../../GlobalParameter';
import {Units} from '../../Units';

export class OceanFarm extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.OCEAN_FARM,
      tags: [Tags.PLANT, Tags.BUILDING],
      cost: 15,
      productionDelta: Units.of({plants: 1, heat: 1}),

      metadata: {
        cardNumber: 'A21',
        requirements: CardRequirements.builder((b) => b.oceans(4)),
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.heat(1).br;
            pb.plants(1);
          }).nbsp.tile(TileType.OCEAN_FARM, false, true);
        }),
        description: 'Requires 4 ocean tiles. Increase your heat production 1 step and increase your plant production 1 step. Place this tile on top of an existing ocean tile. The tile grants an ADJACENCY BONUS of 1 plant.',
      },
    });
  }

  public canPlay(player: Player, game: Game): boolean {
    return game.checkMinRequirements(player, GlobalParameter.OCEANS, 4);
  }

  public play(player: Player, game: Game) {
    player.addProduction(Resources.HEAT, 1);
    player.addProduction(Resources.PLANTS, 1);

    return new SelectSpace(
      'Select space for Ocean Farm',
      game.board.getOceansTiles(false),
      (space: ISpace) => {
        game.removeTile(space.id);
        game.addTile(player, space.spaceType, space, {
          tileType: TileType.OCEAN_FARM,
          card: this.name,
        });
        space.adjacency = {bonus: [SpaceBonus.PLANT]};
        return undefined;
      },
    );
  }
}
