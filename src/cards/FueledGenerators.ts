
import {IProjectCard} from './IProjectCard';
import {Tags} from './Tags';
import {CardType} from './CardType';
import {Player} from '../Player';
import { Resources } from '../Resources';
import { CardName } from '../CardName';

export class FueledGenerators implements IProjectCard {
  public cost: number = 1;
  public tags: Array<Tags> = [Tags.ENERGY, Tags.STEEL];
  public cardType: CardType = CardType.AUTOMATED;
  public name: CardName = CardName.FUELED_GENERATORS;
  public hasRequirements = false;
  public canPlay(player: Player): boolean {
    return player.getProduction(Resources.MEGACREDITS) >= -4;
  }
  public play(player: Player) {
    player.setProduction(Resources.MEGACREDITS,-1);
    player.setProduction(Resources.ENERGY);
    return undefined;
  }
}
