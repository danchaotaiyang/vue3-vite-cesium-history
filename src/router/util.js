export const childrenRouters = (basic, views, components) => {

    const children = [];

    for (const key in views) {
        let { meta } = views[ key ];
        if (!meta) {
            continue;
        }
        let matched = key.match(/(\.\/)(.*)(\.vue)/);
        let routePath = `${ basic }/${ matched[ 2 ] }`;
        let path = `/${ routePath }`;
        let name = `${ routePath }`.split('/').join('-');
        let component = components[ key ];

        children.push({
            path, name, meta, component
        });
    }

    children.sort((a, b) => {
        return a.meta.order - b.meta.order;
    });

    return children;
};
