import {animate, animateChild, group, query, sequence, state, style, transition, trigger} from '@angular/animations';

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
    animate('.2s ease')
  ])),
  transition('* => void', [animate('2s ease')])
]);

export const SlideAnimation =
  trigger('routeAnimations', [
    transition('HrDashboardComponent <=> *', [
      style({position: 'relative'}),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({left: '-100%'})
      ], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('300ms ease-out', style({left: '100%'}))
        ], { optional: true }),
        query(':enter', [
          animate('300ms ease-out', style({left: '0%'}))
        ], { optional: true })
      ]),
      query(':enter', animateChild(), { optional: true }),
    ]),
    transition('* <=> *', [
      style({position: 'relative'}),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ], { optional: true }),
      query(':enter', [
        style({left: '-100%'})
      ], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('200ms ease-out', style({left: '100%'}))
        ], { optional: true }),
        query(':enter', [
          animate('300ms ease-out', style({left: '0%'}))
        ], { optional: true })
      ]),
      query(':enter', animateChild(), { optional: true }),
    ])
  ]);
