6/9/2019
#Understanding Solar Flares with Time Series Data

##Introduction
I spent the past summer doing solar physics research at Stanford University.
I created machine learning models to characterize time series data for solar flare prediction.
In this article, I will first outline some background about solar flares, then dive into what I did for my research.
For a more in-depth analysis, check out the [source code](https://github.com/lucaspauker/hmi-time-series-analysis) and my [poster](/poster).

##What are solar flares?
**Solar flares** are sudden releases of energy due to rapidly changing magnetic fields on the sun.
[Here](https://www.youtube.com/watch?v=HFT7ATLQQx8) is a video of a solar flare.
Solar flares release 10^20 to 10^25 joules of energy.
To put this in perspective, the [estimated world energy consumption in 2013](https://en.wikipedia.org/wiki/World_energy_consumption) was 5.67\*10^20 joules; the largest solar flares release 50,000 times more energy than that.

![Picture of a solar flare](solar_flare.gif)
Extreme ultraviolet picture of a solar flare taken by the AIA instrument

Solar flares are a result of the constantly changing magnetic fields on the sun.
The sun has many regions of strong magnetic field that rotate with the sun: these are called **active regions**.
Within active regions, there may be sunspots (dark spots with lots of magnetic field).
Active regions tend to have both areas of both positive and negative magnetic field, so we can imagine that the magnetic field is a loop above the sun connecting the positive region to the negative region.
When these loops get twisted due to the movement of plasma on the sun, energy builds.
The loops sometimes connect to other loops to release a burst of energy in a short period of time: this burst is a solar flare.

Scientists have been interested in properties of the sun for a long time: it is the closest star we can study!
There have been two major missions for studying the sun: **SOHO** and **SDO**.

- _SOHO: Solar and Heliospheric Observatory_: Launched in 1995, this satellite was originally planned to be operational for only two years, however it is still running and taking data. SOHO is at the _L1_ point between the earth and the sun, meaning that it never changes its distance from the earth or the sun.
- _SDO: Solar Dynamics Observatory_: Launched in 2010, this satellite contains state-of-the-art instruments for taking [beautiful pictures](https://sdo.gsfc.nasa.gov/data/) and [magnetic data](http://jsoc.stanford.edu/data/hmi/images/latest/) of the sun.
The instrument that takes magnetic data is called **HMI** (Helioseismic and Magnetic Imager); the data I used for analyzing solar flares is from this instrument.

![HMI Magnetogram](hmi_magnetogram.jpg)
Diagram of magnetic data taken by HMI: white represents positive magnetic field, black represents negative magnetic field. Note that there are distinct large patches of black and white: these are active regions.

##Why should we care about solar flares?
There are both practical and scienitific reasons for studying solar flares.

First, solar flares have a direct effect on space and earth; they can produce particles in the solar wind which can alter the earth’s magnetic field and emit radiation that affects spacecraft.
Solar flares are often accompanied by coronal mass ejections that can affect satellites and power grids on earth.
For example, in 1989, a [geomagnetic storm](https://en.wikipedia.org/wiki/March_1989_geomagnetic_storm) caused a blackout in Quebec due to variations in the Earth's magnetic field resulting from the storm.
A better understanding of the factors that cause solar flares could allow for more accurate predictions of solar weather to keep satellites and grids functional, as well as improve planning for space travel.

Second, understanding the factors behind solar flares and how the magnetically kctive regions of the sun change will increase our knowledge of other stars.
Many stars have starspots (and therefore magnetic field patterns) similar to the sun and understanding how the active region of the sun changes would provide insight into how these other stars behave.
This is important for finding stars that could have orbiting planets that support life, and for understanding differences between stars in our universe.

##Why is time series important?
The problem of predicting flares is not new.
My approach to the problem was different in two main ways.

1. **Using time series**: Much of the [previous literature](https://iopscience.iop.org/article/10.1088/0004-637X/798/2/135/pdf) in the field has focused on using discrete values for flare prediction.
For example, active regions with more magnetic flux tend to have a higher probability of flaring.
I instead chose to focus on time series data.
Rapid emergence of magnetic flux and free magnetic energy often indicates an increased probability of future flaring activity; if the magnetic loops get twisted faster, they are more likely to flare.
It is reasonable to assume that two active regions with the same amount of magnetic flux, but different flux _emergence_ rates have different flaring activity.
I set out to find what this activity was.
2. **Extracting physical meaning**: Another goal of my project was to extract some physical meaning from the time series data.
This meant choosing a model that was _simple_ and _interpretable_.

##How do we characterize time series data for machine learning?
One of the biggest challenges for my project was featurizing the time series data.
In order to do this, I first **segmented the data** into positive and negative classes, then used **spline fitting** to featurize the data segments.

1. _Segmenting data_: Since flaring is a binary event, I wanted to create input data for a machine learning binary classification algorithm.
In order to ensure that we are just learning on the time series data, all the variables are scaled (linearly) down to zero at the beginning of the time series data.
Furthermore, I defined the positive and negative classes as follows (note: this classification was chosen because it is similar to previous positive/negative classifications in the field):
  - Positive class: A 24-hour period before a flare.
  - Negative class: A 24-hour period without a flare in an active region that does flare. This last distinction is important since the problem of distinguishing between flaring and non-flaring active regions is easier than distinguishing between flaring and non-flaring regions within a flaring active region.
2. _Fitting_: In order to featurize the time series data, I first tried polynomial fits.
For each segmented 24-hour time series, I fit a polynomial, then used the polynomial _coefficients_ as features for the machine learning classifier.
However, polynomial fits returned low accuracy due to [Runge's phenomenon](https://en.wikipedia.org/wiki/Runge%27s_phenomenon), where small changes in the time series data could result in large changes in the polynomial coefficents.
This is no good for our problem for two reasons.
First, the polynomial fits have a great deal of error due to the aforementioned effect.
Second, the sun does not (necessarily) work according to some polynomial function over time.
A better way to represent the changing variables on the sun is with probabilities and state equations.
Thus, we need to divide the data even further.
The solution I devised was to use **spline fits**.
Spline function are piecewise polynomials that are smoothed.
This means that the data at the beginning of the time series will not affect the coefficients of the spline for the end of the time series.
Nice!

I used the interpolated spline fit coefficients as features for a machine learning algorithm to distinguish between the positive and negative case (I specifically used [B-splines](https://en.wikipedia.org/wiki/B-spline) due to their simplicity and interpretability).
Using a _stochastic gradient descent_ and _Adaboost_ classifier, I was able to accurately predict whether a time series will flare according to the spline fit coefficients.
Both models produced similar trends, while Adaboost had higher accuracy.

##What did we learn?

For each variable recorded using the HMI instrument, I fit the variable to a model to predict flares.
The features for the model (as mentioned before) are the spline fit coefficients (fit on variable vs. time data).
We defined lag time as the _length of time series data_ that we learned on.
We ran trials for each variable we had (from HMI) for lag times from 2 hours to 24 hours.
As we changed lag time, we made sure to use the same positive and negative class data and to normalize the data to only analyze the time series before each trial.
The graph below shows the lag time versus accuracy for select variables.
Note that as lag time increases, accuracy increases.

![Accuracy vs. lag time graph](solar_graph_1.png)
Graph of accuracy of different variables verus lag time with error bars. USFLUX=total unsigned flux, MEANJZD=mean electric current, TOTUSJZ=total current, TOTUSJH=total current helicity, TOTPOT=total free energy, R_VALUE=polarity inversion line flux.

From the graph above, we can see that more lag time, which means more time series to learn on, improves the accuracy of the model.
This means that we can conclude that time series is important for predicting flares; part of the signal for flares is encoded in the time series.
The accuracy seems to flatten out near the 15 hour mark, however the error bars (width of the lines) are to large to make a definite conclusion.  
Note: although the individual accuracies of the features are low, I expect that combining the features would yield a higher accuracy. The goal of this study was not to create the highest-accuracy model, instead it was to investigate the importance of time series data in flare prediction.

We can clearly see that there are some variables that outperform others.

- The highest-performing variables are **unsigned flux** (USFLUX), **total electric current** (TOTUSJZ), and **total free energy** (TOTPOT).
  - _Unsigned flux_ is a measure of how much magnetic field there is in an area.
  The formula for flux is magnetic field times area [IS THIS OVERSIMPLIFIED?].
  Changing flux indicates changes in fundamental properties of the active region, so it makes sense that total flux would be a strong variable.
  - _Total electric current_ is a measure of the rotation of the active region.
  It makes sense that current would be a strong predictor since changing magnetic fields cause flares, and current measures how a magnetic field is changing.
  - _Total free energy_ is a measure of how twisted up a magnetic fields is (this is how potential energy is stored).
  Total free energy is compared to the simplest case of a loop without any twists.
  This is one of the best-performing features because the twisting of the magnetic field causes there to be energy that a flare can release.
- The lowest-performing variables are **mean electric current** (MEANJZD), and **polarity inversion line flux** (R_VALUE).
  - _Mean electric current_ is the average electric current value across the entire active region.
  Since mean values are subject to more error than total values, this value is not a good predictor of flares.
  - _Polarity inversion line flux_ is the magnetic flux near the line that divides the positive and negative regions on an active region.
  This feature likely fails to get the relevant information not on the polarity inversion line, making it not a strong feature.

##What are the next steps forward?

Although the above discussion shows that time series data is important for predicting solar flares, this is by no means an exhaustive study of all the work that can be done in the future with time series analysis.
In fact, this project is just a first step in time series analysis of flaring active regions.
Here are a few ways that my work can be extended:

1. A polynomial or spline model does not accurately collect all the data in the time series.
The sun could be better modeled by fitting the probabilities that govern how the state of different magnetic variables change.
We believe that a more robust model such as a _state space model_ would better model the time series.
2. Further analysis can be done by changing the negative case definition.
I defined the negative class as a 24-hour period without a flare.
However, there could conceivably be a negative case with a flare at hour 25 (one hour after the time series).
This would likely look similar to a flaring time series dataset.
Thus, one could explore changing the negative case to assert that there are no flares for some time after the time series data ends.
3. Lastly, the methods used in this project could be used to predict different solar events with time series data.

--

We or I?
