import { Elementary, ElementaryFunc, Extend, Route } from '../elementary.js';
import { div, a, span } from '../elementary.js';

import { Heading, FlexContainer, FlexItem, Button, Toggle } from '../cake.js';
import Timer from './components/Timer.js';
import DataViewer from './components/DataViewer.js';

const CATEGORIES = ['Meetings', 'Coding', 'Creative', 'Education', 'Email/Slack', 'Other'];
const HOME = window.location.hostname === 'dsabsay.github.io' ? '/worktime' : '';

var lightTheme = {
  colors: {
    primary: '#353535',
    secondary: '#c6c6c6',
    background: 'white',
    accent: '#92cff3',
  },
  fontFamily: 'sans-serif',
  spacing: '1rem',
};

var darkTheme = {
  colors: {
    primary: 'white',
    secondary: '#7c7c7c',
    background: '#191919',
    accent: '#92cff3',
  },
  fontFamily: 'sans-serif',
  spacing: '1rem',
};

const App = (props) => Extend(Elementary, {
  initState: function() {
    this.state = {
      isDarkMode: false,
    };
  },

  handleDarkModeToggle: function() {
    this.changeState({
      isDarkMode: !this.state.isDarkMode,
    });

    if (this.state.isDarkMode) {
      document.body.style.backgroundColor = darkTheme.colors.background;
    } else {
      document.body.style.backgroundColor = lightTheme.colors.background;
    }
  },

  render: function() {
    return div(
      { style: { width: '100%' },
        theme: this.state.isDarkMode ? darkTheme : lightTheme
      },
      FlexContainer({ flexDirection: 'column', style: { alignItems: 'center' } },
        FlexItem(
          Heading('Worktime'),
          DarkModeToggle({ onToggle: this.handleDarkModeToggle }),
        ),
        Route(
          HOME + '/',
          FlexItem(
            Timer({
              id: 'my-timer',
              categories: CATEGORIES,
            })
          ),
          FlexItem(
            a('Data', { href: HOME + '/data' })
          )
        ),
        Route(
          HOME + '/data',
          FlexItem(DataViewer( { categories: CATEGORIES })),
          FlexItem(a('Timer', { href: HOME + '/' })),
        )
      )
    );
  }
}, props);

const DarkModeToggle = ElementaryFunc((props) => (
  FlexContainer({ style: { alignItems: 'center', justifyContent: 'center' } },
    Toggle({
      id: 'my-toggle',
      onToggle: props.onToggle,
    }),
    span(
      { style: {
        color: props.theme.colors.primary,
        marginLeft: props.theme.spacing,
      }},
      'Dark Mode'),
  )
));

export default App;
