import * as React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router';

const Previous = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10%;
    background-color: #356327;
    box-shadow: -1px 0 1px rgba(0, 0, 0, 0.5);
    position: absolute;
    height: 1.5em;
    width: 1.5em;
    font-size: 1.5em;
    text-align: center;
    top: 1em;
    left: 1em;
`;

type Props = RouteComponentProps<{}>;

const Back = (props: Props) => (
    <Previous onClick={() => props.history.goBack()}>
        <span>&#8249;</span>
    </Previous>
);

export default withRouter<Props>(Back);
