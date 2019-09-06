import React from "react";
import { CardView } from "./card";
import { InnerListProps } from "./column";
export class InnerList extends React.PureComponent<InnerListProps> {
  public render() {
    return this.props.cards.map((card, index) => (
      <CardView
        key={card.id}
        card={card}
        index={index}
        // XXX passing dispatch not needed
        dispatch={this.props.dispatch}
      />
    ));
  }
}
