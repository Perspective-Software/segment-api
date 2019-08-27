# Segment Api

## Example

```javascript
const segmentApi = new SegmentApi({
    WORKSPACE: 'workspaceId',
    TOKEN: 'token', // personal access token
});

const response = await segmentApi.getCatalogDestination({name: 'facebook-pixel'});

```
