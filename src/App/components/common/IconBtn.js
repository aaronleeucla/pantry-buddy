import React from 'react';
import classNames from 'classnames/bind';
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import PropTypes from "prop-types";
import {
  faTrashAlt,
  faMinus,
  faPlus,
  faPlusSquare,
  faMinusCircle,
  faCaretDown,
  faCaretLeft,
  faPencilAlt,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faTrashAlt,
  faMinus,
  faPlus,
  faPlusSquare,
  faMinusCircle,
  faCaretDown,
  faCaretLeft,
  faPencilAlt,
  faChevronLeft
);

export default function IconBtn({ clickHandler, handlerId, icon, label, alignRight, large }){
  return (
    <button
      onClick={clickHandler}
      handler-id={handlerId}
      aria-label={label}
      type="button"
      className={classNames([
        "border-0 bg-transparent",
        { "ml-auto": alignRight },
        { "fa-lg": large }
      ])}>
      <FontAwesomeIcon role="button" icon={icon} className="text-muted fall-through-click"/>
    </button>
  )
}

IconBtn.propTypes = {
  clickHandler: PropTypes.func,
  handlerId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
