<h1 class="no-toc">Deploy your own model</h1>

To run the models need to deploy on [`a2-highgpu-8g`](https://cloud.google.com/compute/docs/gpus) (currently). This is ~$31.44/hour.

## Dependencies for deploy

   - [Python](https://python.org) (2.7 is supported, but 3.7+ is the recommendation)
   - [offstrategy](https://github.com/offscale/offstrategy), [offregister](https://github.com/offscale/offregister), [offregister-llms](https://github.com/offscale/offregister-llms)
   - [etcd](https://etcd.io) (v2 or v3)
   - Billing account and auth configured for your cloud provider with a cloud provider with sufficient specifications (tested on [Google Cloud](https://cloud.google.com) only thus far)

## Deploy the server

### [`offstrategy`](https://github.com/offscale/offstrategy)
```sh
# JSON file describing Node to create and auth you can base off https://github.com/offscale/offstrategy/blob/master/offstrategy/config/strategy.ubuntu.aws.json
$ python -m offstrategy -n 1 --provider 'EC2' -c 'strategy.ubuntu.aws.json'
# `python -m offswitch -s 'strategy.ubuntu.aws.json'` will delete the VM
```

### Vagrant
```sh
$ vagrant init generic/rocky8
$ vagrant up  # turn off VM with `vagrant halt`
$ vagrant ssh-config  # Use this in next step, first update ~/.ssh/config and set name to 'rocky'
$ # `vagrant destroy` will delete the VM
```

See Bring Your Own Node (BYON) section below for how to make this available to [`offregister`](https://github.com/offscale/offregister).

### Other (BYON)

Use any [Rocky Linux](https://rockylinux.org) 8 installation.

Then enable usage in `offregister` by making this node known to your [`etcd`](https://etcd.io) cluster:
```sh
# You'll need `etcd` running in background for this command:
$ python -m offset --os 'fedora' -u 'vagrant' --dns-name 'rocky' -n 'rocky' \
                   -i "$PWD"'/.vagrant/machines/default/virtualbox/private_key'
```

## Install LLM dependencies using this python package's logic:
```sh
# You'll need `etcd` running in background for this command:
$ python -m offregister -c 'register.llm.json'  # register.llm.json is a default offregister config; see below
```

### `register.llm.json` example
Make sure you set `OFFAUTH_JSON` environment variable to your https://github.com/offscale/offregister/blob/master/offregister/_config/auth.sample.json
```json
{
  "name": "llm",
  "description": "Offregister strategy for Large Language Models",
  "version": "0.0.1",
  "provider": {
    "$ref": "env:OFFAUTH_JSON|offutils.str_from_file | json.loads"
  },
  "register": {
    "/unclustered/rocky": [
      {
        "module": "offregister-bootstrap",
        "type": "fabric"
      },
      {
        "module": "offregister-llms",
        "type": "fabric"
      }
    ]
  },
  "purpose": [
    "llm"
  ],
  "etcd_server": "http://localhost:2379",
  "default_pick": "first"
}
```
