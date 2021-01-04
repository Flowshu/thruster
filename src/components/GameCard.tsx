import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { styled as muiStyled } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Link, withRouter } from "react-router-dom";
import { CardMedia, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import collections from '../data/collections';

const GameCard = (props: any) => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tags, setTags] = React.useState(props.game.collections);

  const addTag = (tag: string) => {
    tags.push(tag);
    setTags(tags);
    handleClose();
  }

  const AddTagDialog = (props: any) => {
    return (
      <Dialog fullWidth onClose={handleClose}  open={props.open}>
        <DialogTitle style={{backgroundColor: "#27262A", color: "#80FF80"}}>
          Add Tag
        </DialogTitle>
        <DialogContent style={{backgroundColor: "#27262A"}}>
          {collections.map((collection: any) => {
            return <Tag
                     size="small"
                     label={collection.name}
                     clickable
                     variant="outlined"
                     onClick={() => {addTag(collection.name);}}
                   />;
          })}
        </DialogContent>
      </Dialog>
    );
  }

  return(
    <div>
      <StyledCard raised>
        <CardMedia>
          <Boxart src={props.game.boxart} alt={props.game.title} />
        </CardMedia>
        <CardContent style={{width: '213px'}}>
          <Title noWrap variant='body2'>
            <b>{props.game.title}</b>
          </Title>
          {tags.map((tag: any) => {
            return(
              <Link to={'/collections/' + tag} style={{textDecoration: 'none'}}>
                <Tag size="small" label={tag} clickable variant="outlined" />
              </Link>
            );
          })}
          <Tag
            size="small"
            label="..."
            clickable
            variant="outlined"
            onClick={handleOpen}
          />
        </CardContent>
      </StyledCard>
      <AddTagDialog open={open}/>
    </div>
  );
}

const Title = muiStyled(Typography)({
  color: '#80FF80',
});

const Tag = muiStyled(Chip)({
  marginRight: "5px",
  marginBottom: "5px",
  color: "#80FF80",
});

const StyledCard = muiStyled(Card)({
  backgroundColor: '#3B3A40',
  margin: "10px",
  //borderWidth: '5px',
  //borderStyle: 'solid',
  //borderColor: '#80FF80',
});

const Boxart = styled.img`
  width: 213px;
  height:285px;
  transition: .2s ease;

  @:hover{
    box-shadow:
    1px 1px #80FF80,
    2px 2px #80FF80,
    3px 3px #80FF80,
    4px 4px #80FF80,
    5px 5px #80FF80;
    transform: translateX(-5px) translateY(-5px);
    transition: .2s ease;
  }
`;

export default withRouter(GameCard);
