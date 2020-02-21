# Segment Api

## Install
```
npm install @perspective-software/segment-api
```

## Docs
Docs available at
https://perspective-software.github.io/segment-api/docs/SegmentApi.html


## Example

```javascript
const segmentApi = new SegmentApi({
    WORKSPACE: 'workspaceId',
    TOKEN: 'token', // personal access token
});

const response = await segmentApi.getCatalogDestination({name: 'facebook-pixel'});

```
