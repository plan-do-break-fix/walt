/**
 * Table of contents
 *
 * @author Arthur Buldauskas <arthurbuldauskas@gmail.com>
 */
import React, { Component } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

class TableOfContents extends Component {
  static propTypes = {
    pages: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        path: PropTypes.string,
        id: PropTypes.id,
        isNative: PropTypes.bool,
      })
    ),
    title: PropTypes.string,
  };

  static defaultProps = {
    title: 'Table of Contents',
  };

  constructor() {
    super();
    this.state = {
      sticky: window.scrollY >= 70,
    };
    this.handleScroll = this.handleScroll.bind(this);
    document.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  shouldComponentUpdate(nextProps, nextState = {}) {
    return nextState.sticky !== this.state.sticky;
  }

  handleScroll() {
    this.setState({
      sticky: window.scrollY >= 70,
    });
  }

  render() {
    return (
      <div
        className={`TableOfContents ${
          this.state.sticky ? 'TableOfContents--sticky' : ''
        }`}
      >
        <h4 className="TableOfContents-title">{this.props.title}</h4>
        <section className="TableOfContents-list">
          <ul>
            {this.props.pages.map(page => (
              <li key={page.title}>
                {page.isNative ? (
                  <a href={page.path}>{page.title}</a>
                ) : (
                  <Link to={page.path} title={page.title}>
                    {page.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }
}
export default TableOfContents;