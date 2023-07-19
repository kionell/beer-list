import { ReactComponent as DeleteIcon } from '../assets/svg/delete.svg';
import { ReactComponent as HopIcon } from '../assets/svg/hop.svg';
import { ReactComponent as InfoIcon } from '../assets/svg/info.svg';
import { ReactComponent as MaltIcon } from '../assets/svg/malt.svg';
import { ReactComponent as TemperatureIcon } from '../assets/svg/temperature.svg';
import { ReactComponent as TemperaturesIcon } from '../assets/svg/temperatures.svg';

export enum IconType {
  Delete = 'delete',
  Info = 'info',
  Hop = 'hop',
  Malt = 'malt',
  Temperature = 'temperature',
  Temperatures = 'temperatures',
}

export function getIconByType(type?: IconType) {
  switch (type) {
    case IconType.Delete: return DeleteIcon;
    case IconType.Hop: return HopIcon;
    case IconType.Malt: return MaltIcon;
    case IconType.Temperature: return TemperatureIcon;
    case IconType.Temperatures: return TemperaturesIcon;
  }

  return InfoIcon;
}
