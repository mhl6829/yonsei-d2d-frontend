import styled from 'styled-components';
import { Mode } from '../../enums/mode.enum';
import { Route } from '../route/Route';
import { useSheet } from '../../contexts/SheetContext';
import { ActionBar } from './ActionBar';
import { Main } from '../main/Main';
import RouteResult from '../route/RouteResult';
import { RouteError } from '../route/RouteError';
import { Search } from '../search/Search';
import SearchResult from '../search/SearchResult';
import { Assistant } from '../assistant/Assistant';

const Sheet = styled.div<{ $isExpanded: boolean; $previewHeight: number; $mainHeight: number; }>`
  position: fixed;
  padding: 0;
  margin: 0;
  bottom: 0;
  left: 50%;
  width: 100%;
  max-width: 600px;

  background: white;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
  transition: 0.3s ease-in-out;

  height: calc(${props => props.$isExpanded ? `${props.$previewHeight +  props.$mainHeight}px` : `${props.$previewHeight}px`} + 68px);
  transform: translateX(-50%);
  z-index: 1000;
`;

const Handle = styled.div`
  width: 40px;
  height: 4px;
  background-color: #ddd;
  border-radius: 2px;
  margin: 12px auto;
  cursor: pointer;
`;

const HandleWrapper = styled.div`
  width: 100%;
  margin: 0;
`

const BottomSheet = () => {
    const {currentMode, previewContentHeight, mainContentHeight, isExpanded, setIsExpanded} = useSheet();

    const Content = () => {
      switch (currentMode) {
        case Mode.MAIN: return <Main></Main>;
        // Route
        case Mode.ROUTE: return <Route></Route>;
        case Mode.ROUTE_RESULT: return <RouteResult></RouteResult>;
        case Mode.ROUTE_ERROR: return <RouteError></RouteError>;
        // Search
        case Mode.SEARCH: return <Search></Search>;
        case Mode.SEARCH_RESULT: return <SearchResult></SearchResult>;
        // ASSISTAT
        case Mode.ASSISTANT: return <Assistant></Assistant>;
      }
    }
  
    return (
      <Sheet $isExpanded={isExpanded} $previewHeight={previewContentHeight} $mainHeight={mainContentHeight}>
        <HandleWrapper  onClick={() => setIsExpanded(!isExpanded)}>
          <Handle />
        </HandleWrapper>
          <ActionBar></ActionBar>
          {Content()}
      </Sheet>
    );
  };

export default BottomSheet; 