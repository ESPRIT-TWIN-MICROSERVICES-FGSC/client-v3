import {animate, sequence, state, style, transition, trigger} from '@angular/animations';

export const EnterTriggerAnimation = trigger('enterTrigger', [
  state('fadeIn', style({
    opacity: '1',
  })),
  transition('void => *', [style({opacity: '0'}), animate('500ms')])
]);

export const SimpleFadeAnimation = trigger('simpleFadeAnimation', [
  state('in', style({opacity: 1})),
  transition(':enter', [
    style({opacity: 0}),
    animate(600)
  ]),
  transition(':leave',
    animate(600, style({opacity: 0})))
  ]
);

export const MatTableRowsAnimation = trigger('rowsAnimation', [
  transition('void => *', [
    style({height: '*', opacity: '0', transform: 'translateX(-550px)', 'box-shadow': 'none'}),
    sequence([
      animate('.35s ease', style({height: '*', opacity: '.2', transform: 'translateX(0)', 'box-shadow': 'none'})),
      animate('.35s ease', style({height: '*', opacity: 1, transform: 'translateX(0)'}))
    ])
  ])
]);

export const FadeOutAnimation = trigger('fadeOut', [
  state('void', style({
    opacity: 0,
    transform: 'translateX(-550px)',
    'box-shadow': 'none'
  })),
  transition('void => *', sequence([
    animate('.5s ease')
  ])),
  transition('* => void', [animate('5s ease')])
]);
