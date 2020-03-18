import { combineReducers } from 'redux';
import ClustersReducer from './clustersReducer';
import AddClusterReducer from './addClusterReducer';
import AddProjectReducer from './addProjectReducer';
import user from './user';
import ClusterResourcesReducer from './ClusterResourcesReducer';
import ServicesReducer from './servicesReducer';
import PvsReducer from './PvsReducer';
import nodesReducer from './nodesReducer';
import PvcsReducer from './pvcsReducer';
import NamespacesListReducer from './NamespacesListReducer';
import podsReducer from './podsReducer';
import storageClassesReducer from './storageClassReducer';
import JobsReducer from './jobsReducer';
import getDeployments from './getDeployments';
import UserProjectsReducer from './userProjectsReducer';
import AdminProjectsReducer from './AdminProjectsReducer';


export default combineReducers({
  ClusterResourcesReducer,
  ClustersReducer,
  user,
  AddClusterReducer,
  ServicesReducer,
  PvsReducer,
  nodesReducer,
  PvcsReducer,
  NamespacesListReducer,
  podsReducer,
  storageClassesReducer,
  deployments: getDeployments,
  JobsReducer,
  UserProjectsReducer,
  AdminProjectsReducer,
  AddProjectReducer,
});
