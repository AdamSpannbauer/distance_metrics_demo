# Distance Metrics

Small demo app to compare some distance metrics.  App is live at [https://adamspannbauer.github.io/distance_metrics_demo/](https://adamspannbauer.github.io/distance_metrics_demo/)

## To add a `DistanceMetric`


### Steps:

1. Copy `distances/distance_metric_subclass_template.js` and paste your file into the `distances` dir with an appropriate name for the metric you plan to add
2. Complete all the `TODO` items in the template
3. `import` the new metric in `sketch.js`
4. Add your distance metric to the `window` object in `sketch.js`
5. Add your distance metric to the `distance_metric_objs` array in `sketch.js`


### Examples:

* Euclidean distance: see `distances/euclidean_dist.js` and how the metric is imported in `sketch.js`
* Manhattan distance: see `distances/manhattan_dist.js` and how the metric is imported in `sketch.js`
* Chebyshev distance: see `distances/chebyshev_dist.js` and how the metric is imported in `sketch.js`
