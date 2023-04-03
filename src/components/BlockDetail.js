import { useContext, useState, useEffect } from 'react';
import {
  Box,
  Card,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';
import { Container } from '@mui/system';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Select from '@mui/material/Select';
import { BlockListContext } from '@/pages';

const BlockDetail = ({ selectedItemIdFromParent }) => {
  const { list, setList, ...ctx } = useContext(BlockListContext);
  const [selectedItem, setSelectedItem] = useState({});
  const [changedName, setChangedName] = useState('');
  const [selectedItemId, setSelectedItemId] = useState(selectedItemIdFromParent);
  const [formula, setFormula] = useState('');
  let selectedListItemById = {};
  let selectedListItemByParentId = {};

  const handleChange = (event) => {
    setFormula((prevState) => Number(prevState) + event.target.value);
  };

  useEffect(() => {
    selectedListItemByParentId = list.find((item) => item.id == selectedItemIdFromParent);
    setSelectedItemId(selectedItemIdFromParent);
    setSelectedItem(selectedListItemByParentId);
    setChangedName(selectedListItemByParentId.title);
  }, [selectedItemIdFromParent]);

  useEffect(() => {
    if (!selectedItemId) {
      return;
    }
    selectedListItemById = list.find((item) => item.id == selectedItemId);
    setSelectedItem(selectedListItemById);
    setChangedName(selectedListItemById.title);
  }, [selectedItemId]);

  const getSelectedListItemById = (event) => {
    setSelectedItemId(event.currentTarget.id);
    selectedListItemById = list.find((item) => item.id == event.currentTarget.id);
    setSelectedItem(selectedListItemById);
    setChangedName(selectedListItemById.title);
  };

  const nameChangeHandler = (event) => {
    setChangedName(event.target.value);
    setSelectedItem((prevState) => {
      return { ...prevState, title: event.target.value };
    });
    setList((prevState) =>
      prevState.map((listItem) => {
        if ((selectedItemId ? selectedItemId : selectedItemIdFromParent) == listItem.id) {
          return { ...listItem, title: event.target.value };
        }
        return listItem;
      })
    );
  };
  return (
    <>
      <Container>
        <Card style={{ border: '1px solid #e4e4e4' }}>
          <Container>
            <CloseOutlinedIcon
              style={{
                marginLeft: 'auto',
                display: 'flex',
                marginRight: '-15px',
                cursor: 'pointer',
                marginTop: '10px',
              }}
              onClick={ctx.onCloseModal}
            />
            <Box>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <TextField
                    id="standard-basic-1"
                    variant="standard"
                    placeholder="Change Name"
                    style={{ width: '100%', marginTop: '20px' }}
                    value={changedName}
                    onInput={nameChangeHandler}
                  />
                  <FormControl
                    variant="standard"
                    sx={{ m: 1, minWidth: 120 }}
                    style={{ width: '100%', marginTop: '20px' }}
                  >
                    <InputLabel id="demo-simple-select-standard-label">Formula</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={formula}
                      onChange={handleChange}
                      label="Formula"
                    >
                      <MenuItem value="">{/* <em>None</em> */}</MenuItem>
                      <MenuItem value={'+'}>sum</MenuItem>
                      <MenuItem value={'-'}>sub</MenuItem>
                      <MenuItem value={'*'}>mul</MenuItem>
                      <MenuItem value={'/'}>div</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    id="standard-basic-3"
                    placeholder="= Blank"
                    variant="standard"
                    value={formula}
                    style={{ width: '100%', marginTop: '20px' }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Container>
          <Grid container spacing={0}>
            <Grid item md={4} style={{ background: '#f5f5f5', marginTop: '20px' }}>
              <List>
                {list.map((item) => (
                  <ListItem key={item.id} id={item.id} onClick={getSelectedListItemById} color={'red'}>
                    <ListItemButton>
                      <ListItemIcon>
                        <CalendarMonthOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary={item.title}></ListItemText>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <ul>
                <p>{formula}</p>
                {/* <p>SelectedItemId{selectedItemId}</p> */}
              </ul>
            </Grid>
            <Grid item md={8} style={{ background: '#f5f5f5', marginTop: '20px' }}>
              <h3>{selectedItem.title}</h3>
              <p>A block on this app with 5 properties</p>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
};

export default BlockDetail;
