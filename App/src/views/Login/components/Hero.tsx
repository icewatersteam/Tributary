import React, { useMemo } from 'react'
import styled from 'styled-components';
import Card from '../../../components/Card'
import Button from '../../../components/Button';
import firebase from "firebase";

interface HeroProps {        
    username: string,
    handleLogout: () => void
}

const Hero: React.FC<HeroProps> = ({       
    username,
    handleLogout 
}) => {
    return (
    <HeroContainer>
        <Card style="glass">
            <h3>Welcome {username}!</h3>
            <Button 
                onClick={handleLogout}
                variant="secondary">Sign Out</Button>            
        </Card>
    </HeroContainer>
    )
}

const HeroContainer = styled.div`       
    max-width: 450px;
    margin: 100px auto;
    color: ${props => props.theme.color.white};

    h3 {
        margin: 0px 0px 20px 0px;
    }
`;

export default Hero
