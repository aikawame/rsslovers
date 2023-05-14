#
# Builder
#
FROM public.ecr.aws/lambda/ruby:3.2.2023.05.13.01 as builder

RUN yum install -y \
        libX11 \
        unzip \
    && curl -OL https://github.com/adieuadieu/serverless-chrome/releases/download/v1.0.0-55/stable-headless-chromium-amazonlinux-2017-03.zip \
    && curl -OL https://chromedriver.storage.googleapis.com/2.43/chromedriver_linux64.zip \
    && unzip stable-headless-chromium-amazonlinux-2017-03.zip \
    && unzip chromedriver_linux64.zip

#
# Main
#
FROM public.ecr.aws/lambda/ruby:3.2.2023.05.13.01

COPY Gemfile Gemfile.lock ./

ENV PATH=$PATH:${LAMBDA_TASK_ROOT}/bin
ENV GEM_HOME=${LAMBDA_TASK_ROOT}
ENV RAILS_ENV=production
ENV RAILS_LOG_TO_STDOUT=1
ENV TZ=Asia/Tokyo

RUN yum install -y \
        fontconfig \
        gcc \
        ipa-gothic-fonts \
        make \
    && bundle install \
    && fc-cache -fv \
    && yum remove -y \
        gcc \
        make \
    && rm -rf /var/cache/yum/* \
    && yum clean all

COPY --from=builder ${LAMBDA_TASK_ROOT}/headless-chromium /usr/bin/chromium
COPY --from=builder /usr/lib64/libexpat.so.1 /usr/lib64/libexpat.so.1
COPY --from=builder /usr/lib64/libuuid.so.1 /usr/lib64/libuuid.so.1

COPY --from=builder ${LAMBDA_TASK_ROOT}/chromedriver /usr/bin/chromedriver
COPY --from=builder /usr/lib64/libglib-2.0.so.0 /usr/lib64/libglib-2.0.so.0
COPY --from=builder /usr/lib64/libX11.so.6 /usr/lib64/libX11.so.6
COPY --from=builder /usr/lib64/libxcb.so.1 /usr/lib64/libxcb.so.1
COPY --from=builder /usr/lib64/libXau.so.6 /usr/lib64/libXau.so.6

COPY . .

CMD ["lambda.handler"]
