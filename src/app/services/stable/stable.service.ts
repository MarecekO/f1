import {Injectable} from '@angular/core';
import {StorageService} from '../storage/storage.service';
import {ReplaySubject} from 'rxjs';
import {TeamResponse} from '../../models/team.model';

export interface Stable {
  id: number;
  name: string;
  homepage: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StableService {
  detail: TeamResponse = {
    get: 'teams',
    parameters: {id:'1'},
    errors: [],
    results: 1,
    response: [
      {id: 1,
        name: 'Red Bull Racing',
        logo: 'https://media-3.api-sports.io/formula-1/teams/1.png',
        base: 'Milton Keynes, United Kingdom',
        first_team_entry: 1997,
        world_championships: 4,
        highest_race_finish: {
          position: 1,
          // eslint-disable-next-line id-blacklist
          number: 75
        },
        pole_positions: 73,
        fastest_laps: 76,
        president: 'Dietrich Mateschitz',
        director: 'Christian Horner',
        technical_manager: 'Pierre Waché',
        chassis: 'RB18',
        engine: 'Red Bull Powertrains',
        tyres: 'Pirelli'}
    ],
  };

  private privateStables: Stable[] = [
    {
      id: 1,
      name: 'Red Bull',
      homepage: true
    },
    {
      id: 2,
      name: 'McLaren',
      homepage: true
    },
    {
      id: 3,
      name: 'Ferrari',
      homepage: false
    },
    {
      id: 5,
      name: 'Mercedes-AMG',
      homepage: false
    },
    {
      id: 7,
      name: 'AlphaTauri',
      homepage: false
    },
    {
      id: 12,
      name: 'Williams',
      homepage: false
    },
    {
      id: 13,
      name: 'Alpine',
      homepage: false
    },
    {
      id: 14,
      name: 'Haas',
      homepage: false
    },
    {
      id: 17,
      name: 'Aston Martin',
      homepage: false
    },
    {
      id: 18,
      name: 'Alfa Romeo',
      homepage: false
    }
  ];

  private privateStablesSubject = new ReplaySubject<Stable[]>(1);

  constructor(
    private storageService: StorageService
  ) {
    this.storageService.getData('stables').then(stables=> {
      if (stables) {
        this.privateStablesSubject.next(stables);
      } else {
        this.privateStablesSubject.next(this.privateStables);
      }
    });
  }

  /**
   * @deprecated
   */
  get stables(): Stable[] {
    return this.privateStables;
  }

  get stables$() {
    return this.privateStablesSubject.asObservable();
  }
  async setHome(index: number, active: boolean) {
    this.privateStables[index].homepage = active;
    await this.storageService.saveData('stables', this.privateStables);
    this.privateStablesSubject.next(this.privateStables);
  }
}
